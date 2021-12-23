const fs = require("fs");
const models = require("./models");
const exec = require("child_process").exec;

module.exports = () => {
    models.Option.find({},null, { sort: "resource destination name" }, function(err, options){

        let content = '';
        const path = process.env.NGINX_CONF;

        options.map(option => {
            let baseURL = option.baseURL;
            baseURL += (baseURL[baseURL.length - 1] == '/') ? '' : '/';

            switch (option.resource) {
                case "pb":
                    baseURL += 'ws/data-receiving.1cws';
                    break;
                case "sv":
                    baseURL += 'ws/data-receiving.1cws';
                    break;
                case "ws":
                    baseURL += 'ws/' + option.name;
                    break;
                case "hs":
                    baseURL += 'hs/' + option.name + '/';
                    break;
                default:
                    console.log(`unknown resource${option.resource} in options ${option.id}`);
                    return;
            }

            content += "location = /" + option.resource + '/' + option.destination + '/' + option.name + " {\n";
            content += "\trewrite ^.*$ " + baseURL + ";\n";
            content += "}\n\n";
        });

        fs.writeFileSync(path, content);

        exec("nginx -s reload", function(error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null)
                console.log('exec error: ' + error);
        });

    });
};