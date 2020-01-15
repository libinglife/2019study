const fs = require('fs');
const path = require('path')

const static = (dirPath = './public') => async(ctx, next) => {
    // const files = fs.readdirSync(dirPath);
    // console.log(files);
    // files.forEach(file => {
    //     const code = fs.readFileSync(path.resolve(dirPath, file));
    //     console.log(code);
    //     ctx.body = code
    // })

    // return


    const basename = '/' + path.basename(dirPath);

    if (ctx.url.indexOf(basename) === 0) {
        // console.log("dirname", __dirname);
        // console.log("dirPath", dirPath);
        const url = path.resolve(__dirname, dirPath);
        console.log("url:-->", url)


        const filePath = url + ctx.url.replace(basename, '');
        console.log("filePath:-->", filePath)

        try {
            const stats = fs.statSync(filePath); //判断是否是文件夹

            if (stats.isDirectory()) {

                const dirs = fs.readdirSync(filePath);
                console.log('dirs-->', dirs)
                const ret = ['<div style="padding-left:20px">'];
                console.log(ctx.url);

                dirs.forEach(filename => {
                    console.log(filename);
                    const tmpPath = path.resolve(filePath, filename);
                    console.log('tmpPath', tmpPath);
                    // 再次判断是不是文件夹
                    let tempUrl = ctx.url.replace(/\/$/, ''); //去掉字符串尾部的 /
                    console.log("tempUrl---->", tempUrl)
                    if (fs.statSync(tmpPath).isDirectory()) {
                        ret.push(
                            `<p><a style="color:black" href="${
                            tempUrl
                            }/${filename}">${filename}</a></p>`
                        );
                    } else {
                        // 文件
                        ret.push(
                            `<p><a href="${tempUrl}/${filename}">${filename}</a></p>`
                        );
                    }
                    ret.push("</div>");
                    ctx.body = ret.join('')
                })

            } else {
                console.log("文件");
                const content = fs.readFileSync(filePath);
                ctx.body = content;
            }

        } catch (error) {
            ctx.body = "404 not found"
        }

    } else {
        await next()
    }
}
module.exports = static