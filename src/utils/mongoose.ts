import { Document, Model } from 'mongoose';

interface PopulatedDocument extends Document {
  [key: string]: any;
}

type RecursivePopulateFn = <T extends PopulatedDocument>(
  doc: T,
  model: Model<T>,
  field: PopulatedField,
  options?: RecursivePopulateOptions,
) => Promise<T>;

type PopulatedField = string | { path: string; model?: string };

type RecursivePopulateOptions = {
  excludePaths?: string[];
  maxDepth?: number;
  currentDepth?: number;
};

const recursivePopulate: RecursivePopulateFn = async (
  doc,
  model,
  field,
  options = {},
) => {
  const { excludePaths = [], maxDepth = Infinity, currentDepth = 0 } = options;

  if (!doc || currentDepth >= maxDepth) {
    return doc;
  }

  if (typeof field === 'string') {
    if (excludePaths.includes(field)) {
      return doc;
    }

    await model.populate(doc, { path: field });
    const populatedDoc = await model.findById(doc._id);
    const subFields = model.schema.obj[field];

    if (subFields) {
      const subPopulatePromises = Object.keys(subFields)
        .filter((subField) => subFields[subField].ref)
        .map(async (subField) => {
          const subFieldModel = model.db.model(subFields[subField].ref);
          const subFieldOptions = {
            excludePaths: excludePaths.concat([field]),
            maxDepth,
            currentDepth: currentDepth + 1,
          };
          await recursivePopulate(
            populatedDoc,
            subFieldModel,
            subField,
            subFieldOptions,
          );
        });

      await Promise.all(subPopulatePromises);
    }

    return populatedDoc;
  }

  const { path, model: refModel } = field;
  const subModel = refModel
    ? model.db.model(refModel)
    : model.db.model(model.schema.obj[path].ref);
  const subOptions = {
    excludePaths: excludePaths.concat([path]),
    maxDepth,
    currentDepth: currentDepth + 1,
  };

  const subDocs = await subModel.find({ [path]: doc._id });

  const subPopulatePromises = subDocs.map((subDoc) =>
    recursivePopulate(subDoc, subModel, path, subOptions),
  );
  await Promise.all(subPopulatePromises);

  doc.set(path, subDocs);

  return doc;
};

export default recursivePopulate;
