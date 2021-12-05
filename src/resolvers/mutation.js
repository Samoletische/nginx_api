module.exports = {
    save: async (parent, args, {models, updateNginx}) => {
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
                })
        }

        //todo: определять достоверно изменилось ли что-нибудь в базе, и пересобирать файл locations только, если изменилось
        if (option) {
            updateNginx();
            return option;
        }
    },
    saveAll: async (parent, args, {models, updateNginx}) => {
        if (args.options) {
            models.Option.deleteMany({}, function (err) {
                if (err)
                    console.log(err);
                else {
                    models.Option.insertMany(args.options, function(err) {
                        if (err)
                            console.log(err);
                    });
                }
            })
        }
        updateNginx();
        //todo: разобраться как сначала выполнить действия над базой, чтобы вернуть нормальный ответ, а то всегда true
        return true;
    },
    remove: async (parent, {id}, {models, updateNginx}) => {
        try {
            await models.Option.findOneAndRemove({_id: id});
            updateNginx();
            //todo: разобраться как сначала выполнить действия над базой, чтобы вернуть нормальный ответ, а то всегда true
            return true;
        } catch (err) {
            return false;
        }
    },
    removeAll: async (parent, {models, updateNginx}) => {
        models.Option.deleteMany({}, function (err) {
            if (err)
                console.log(err);
        })
        updateNginx();
        //todo: разобраться как сначала выполнить действия над базой, чтобы вернуть нормальный ответ, а то всегда true
        return true;
    }
};