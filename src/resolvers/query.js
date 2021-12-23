module.exports = {
    read: (parent, {id}, {models}) => {
        return models.Option.findById(id);
    },
    readAll: (parent, args, {models}) => {
        if (args.resource == '')
            delete args.resource;
        if (args.name == '')
            delete args.name;
        if (args.destination == '')
            delete args.destination;
        if (args.baseURL == '')
            delete args.baseURL;
        if (args.author == '')
            delete args.author;

        return models.Option.find(args);
    }
};