const fs = require("fs");
const models = require("./models");

module.exports = () => {
    models.Option.find({},null, { sort: "resource destination name" }, function(err, options){

        let content = '';
        const path = process.env.NGINX_CONF;

        options.map(option => {
            content += "location = /" + option.resource + '/' + option.destination + '/' + option.name + " {\n";
            content += "\tproxy_pass " + option.baseURL + "\n";
            content += "}\n\n";
        });

        fs.writeFile(path, content, function(err) {
            if (err)
                console.log(err);
        });

    });
};