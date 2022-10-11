import path from "path"
import fs from "fs"
import appRoot from "app-root-path"

export default {
    collect: () => {
        return new Promise((resolve, reject) => {
            let routes = []
            try {
                fs.readdir(path.join(appRoot.path,'/app/rout/') , (err,files)=>{
                    for (const file of files)
                        routes.push(file)

                    resolve(routes)
                });
            } catch (err) {
                reject(err);
            }
        })
    }
}