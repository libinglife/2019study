const cluster = require('cluster')
const os = require('os')

const numCpus = os.cpus().length; //获取cpu 的数量
const process = require('process');

const workers = {}; //存储工作线程
console.log("主线程master:", cluster.isMaster)
if (cluster.isMaster) { //主线程分支

    console.log("执行主进程CPU")
    for (let i = 0; i < numCpus; i++) {
        const worker = cluster.fork();
        // console.log(worker.pid)
        console.log(worker.process.pid)

        workers[worker.process.pid] = worker

    }


    cluster.on('fork', (worker) => {
        console.log(`fork：worker${worker.id}`)
    });
    cluster.on('listening', (worker, addr) => {
        console.log(`worker-->${worker.id} listening on ${addr.address}:${addr.port}`)
    });
    cluster.on('online', (worker) => {
        console.log(`workerId--->${worker.id} is online now`)
    });


    // cluster.on('exit', (worker) => {
    //     console.log(`worker${worker.id} exit.`)
    // });


    // cluster.on('disconnect', function(worker) {
    //     //当一个进程结束时，重启工作进程 delete workers[worker.pid]
    //     console.log('挂掉disconnect  worker:', worker.id + "died");
    //     const tempWorker = cluster.fork();
    //     workers[tempWorker.process.pid] = tempWorker;
    // })

    cluster.on('death', function(worker) {
        //当一个进程结束时，重启工作进程 delete workers[worker.pid]
        console.log('death 挂掉 worker:', worker.id + "died");
        const tempWorker = cluster.fork();
        workers[tempWorker.process.pid] = tempWorker;
    })

} else {
    // 工作进程分支，启动服务器;
    const app = require('./app');
    app.use(async(ctx, next) => {
        // console.log("ctx url,", ctx.url)
        console.log("worker:" + cluster.worker.id, "process pid:" + process.pid);
        await next();
    })

    app.listen(3001, () => {
        console.log("分支启动进行服务,3001");
    })

}

// 当进程被终止时 ，关闭所有进程
process.on("SIGTERM", () => {
    for (const pid in workers) {
        console.log("杀死进程pid:", pid)
        if (workers.hasOwnProperty(pid)) {
            process.kill(pid)
        }
    }
    process.exit(0)
})



// console.log(workers);

require('./http.js');