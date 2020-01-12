module.exports = {
        interval: '1-50 * * * * *',

        handler() {
            console.log('定时任务 3秒执行一次' + new Date());
        }
    }
    // const schedule = require('node-schedule');
    // const task1 = () => {
    //     //每分钟的1-10秒都会触发，其它通配符依次类推
    //     schedule.scheduleJob('1-10 * * * * *', () => {
    //         console.log('scheduleCronstyle:' + new Date());
    //     })
    // }

// task1()