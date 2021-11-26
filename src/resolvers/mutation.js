module.exports = {
    save: async (parent, args, {models}) => {
        let resource = args.resource;
        let methodName = (args.methodName == undefined) ? '' : args.methodName;
        let destination = args.destination;
        let name = args.name;
        let baseURL = args.baseURL;
        let author = args.author;

        // search by id
        if (args.id != undefined) {
            let option = models.Option.findById(args.id);

            if (option) {
                return models.Option.findOneAndUpdate(
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
                        new: false
                    })
            }
        }

        // search by key-fields
        let option = models.Option.find({
            resource: resource,
            destination: destination,
            name: name,
            methodName: methodName
        });

        //todo: проверить почему не работает new: true - разобраться
        // тогда убрать поиск Настройки выше и создание Настройки ниже
        if (option) {
            return models.Option.findOneAndUpdate(
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
                    new: true
                })
        }

        return await models.Option.create({
            resource: resource,
            name: name,
            methodName: methodName,
            destination: destination,
            baseURL: baseURL,
            author: author
        });
    },
    saveAll: async (parent, args, {models}) => {
        //todo: вставить проверку наличия аргумента options
        // если найден, удалить все и создать новые Настройки
        return true;
    },
    remove: async (parent, {id}, {models}) => {
        try {
            await models.Option.findOneAndRemove({_id: id});
            return true;
        } catch (err) {
            return false;
        }
    },
    removeAll: async (parent, {models}) => {
        //todo: вставить удаление всех Настроек
        return true;
    }
};