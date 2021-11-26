module.exports = {
    read: async (parent, args, {models}) => {
        return await models.Option.findById(args.id);
    },
    readAll: async (parent, args, {models}) => {
        if (args.author == undefined)
            return await models.Option.find();
        else
            return await models.Option.find({author: args.author});
    }
};