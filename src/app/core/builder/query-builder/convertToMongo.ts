export  function  convertToMongoPipeline(query: any): any[] {
    const pipeline: any[] = [];

    function processRule(rule: any) {
        const { field, operator, value } = rule;
        if (field && operator && value !== undefined && value !== null) {
            let matchStage: any = {};
            switch (operator) {
                case "=":
                    matchStage = { [field]: value };
                    break;
                case "<":
                    matchStage = { [field]: { $lt: value } };
                    break;
                case "<=":
                    matchStage = { [field]: { $lte: value } };
                    break;
                case ">":
                    matchStage = { [field]: { $gt: value } };
                    break;
                case ">=":
                    matchStage = { [field]: { $gte: value } };
                    break;
                case "!=":
                    matchStage = { [field]: { $ne: value } };
                    break;
                case "in":
                    matchStage = { [field]: { $in: value } };
                    break;
                case "not_in":
                    matchStage = { [field]: { $nin: value } };
                    break;
                case "contains":
                    matchStage = { [field]: { $regex: `.*${value}.*`, $options: 'i' } };
                    break;
                case "starts_with":
                    matchStage = { [field]: { $regex: `^${value}`, $options: 'i' } };
                    break;
                case "ends_with":
                    matchStage = { [field]: { $regex: `${value}$`, $options: 'i' } };
                    break;
                default:
                    console.error(`Invalid operator: ${operator}`);
                    break;
            }
            pipeline.push({ $match: matchStage });
        }
    }

    function processCondition(condition: any) {
        if (!condition || !condition.condition || !condition.rules) {
            return;
        }

        const operator = condition.condition === 'and' ? '$and' : '$or';
        const subConditions: any[] = [];
        condition.rules.forEach((ruleOrCondition: any) => {
            if (ruleOrCondition.condition) {
                const subPipeline = convertToMongoPipeline(ruleOrCondition);
                if (subPipeline.length > 0) {
                    subConditions.push(subPipeline[0].$match);
                }
            } else {
                processRule(ruleOrCondition);
            }
        });
        if (subConditions.length > 0) {
            pipeline.push({ [operator]: subConditions });
        }
    }

    processCondition(query);

    return pipeline;
}