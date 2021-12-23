module.exports = {
    save: (parent, args, {models, updateNginx}) => {
        let resource = args.resource;
        let methodName = (args.methodName == undefined) ? '' : args.methodName;
        let destination = args.destination;
        let name = args.name;
        let baseURL = args.baseURL;
        let author = args.author;

        let option = null;

        // search by id
        if (args.id) {
            option = models.Option.findOneAndUpdate(
                    {
                        _id: args.id
                    },
                    {
                        $set: {
                            resource,
                            destination,
                            name,
                            methodName,
                            baseURL,
                            author
                        }
                    },
                    {
                        upsert: false,
                        returnOriginal: false
                    }, function(err, result) {
                        if (err) return "find by id error";
                        updateNginx();
                        //return result;
                    });
            // }
        } else {
            option = models.Option.findOneAndUpdate(
                {
                    resource: resource,
                    destination: destination,
                    name: name,
                    methodName: methodName
                },
                {
                    $set: {
                        resource,
                        destination,
                        name,
                        methodName,
                        baseURL,
                        author
                    }
                },
                {
                    upsert: true,
                    returnOriginal: false
                }, function (err, result) {
                    if (err) return "find by measures error";
                    updateNginx();
                })
        }
        return option;
    },
    saveAll: (parent, args, {models, updateNginx}) => {
        if (args.options) {
            models.Option.deleteMany({}, function (err) {
                if (err) return "all remove in saveAll error";
                models.Option.insertMany(args.options, function(err) {
                    if (err) return "all insert error";
                    updateNginx();
                });
            })
        }
        return true;
    },
    remove: (parent, {id}, {models, updateNginx}) => {
        try {
            models.Option.findOneAndRemove({_id: id}, null,function(err, result) {
               if (err) return "remove error";
                updateNginx();
            });
            return true;
        } catch (err) {
            return false;
        }
    },
    removeAll: (parent, {models, updateNginx}) => {
        models.Option.deleteMany({}, function (err) {
            if (err) return "all remove error";
            updateNginx();
        });
        return true;
    }
};