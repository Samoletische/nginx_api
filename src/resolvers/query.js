module.exports = {
    read: async (parent, {id}, {models}) => {
        return await models.Option.findById(id);
    },
    readAll: async (parent, args, {models}) => {
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

        return await models.Option.find(args);
    }
};