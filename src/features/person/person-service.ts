import { createError } from '@/utils/error';
import PersonModel, {  } from './person-model';
import { createPersonDto, updatePersonDto } from './person-dto';
import { ObjectId } from 'mongoose';
import { uniqBy } from 'lodash';

export const findAll = async (page = 1, limits = 10, tree = false) => {
  try {
    const startIndex = (page - 1) * limits;
    const personDoc = PersonModel.find(
      tree
        ? {
            $and: [{ father: null, mother: null }],
          }
        : {},
    );

    if (!tree) {
      personDoc.skip(startIndex).limit(limits);
    }
    return await personDoc.exec();
  } catch (error) {
    console.log(error);
    throw createError(500, 'Internal Server Error');
  }
};

export const create = async (dto: createPersonDto) => {
  try {
    const newPerson = new PersonModel(dto);
    return await newPerson.save();
  } catch (error) {
    throw createError(400, (error as Error).message);
  }
};

export const update = async (id: string, dto: updatePersonDto) => {
  const personToUpdate = await PersonModel.findById(id);

  if (!personToUpdate) {
    throw createError(404, 'Person is not found');
  }

  const { father: dtoFather, mother: dtoMother, children: dtoChildren } = dto;

  const updateParent = async (parent: string, child: string) => {
    if (!parent) {
      return;
    }

    const parentDoc = await PersonModel.findById(parent);

    if (!parentDoc) {
      return;
    }

    const children = uniqBy(
      [
        ...((parentDoc.children || []) as unknown as ObjectId[]),
        child as unknown as ObjectId,
      ],
      (item: ObjectId) => item.toString(),
    ) as unknown as string[];

    parentDoc.children = children;

    await parentDoc.save();
  };

  const removeParent = async (parent: string, child: string) => {
    if (!parent) {
      return;
    }

    const parentDoc = await PersonModel.findById(parent);

    if (!parentDoc) {
      return;
    }

    parentDoc.children = (parentDoc.children || []).filter(
      (_id) => _id.toString() !== child,
    );

    await parentDoc.save();
  };

  const updateChildren = async (children: string[]) => {
    const previousChildren = personToUpdate.children || [];

    for (const childId of previousChildren) {
      if (!children.includes(childId as string)) {
        const child = await PersonModel.findById(childId);

        if (!child) {
          continue;
        }

        if (personToUpdate.gender === 'male') {
          child.father = null;
        } else if (personToUpdate.gender === 'female') {
          child.mother = null;
        }

        await child.save();
      }
    }

    for (const childId of children) {
      const child = await PersonModel.findById(childId);

      if (!child) {
        continue;
      }

      if (personToUpdate.gender === 'male') {
        child.father = personToUpdate._id;
      } else if (personToUpdate.gender === 'female') {
        child.mother = personToUpdate._id;
      }

      await child.save();
    }

    personToUpdate.children = children;
  };

  if (dtoFather) {
    await updateParent(dtoFather, id);
    personToUpdate.father = dtoFather;
  } else {
    await removeParent(personToUpdate.father as string, id);
    personToUpdate.father = null;
  }

  if (dtoMother) {
    await updateParent(dtoMother, id);
    personToUpdate.mother = dtoMother;
  } else {
    await removeParent(personToUpdate.mother as string, id);
    personToUpdate.mother = null;
  }

  if (dtoChildren) {
    await updateChildren(dtoChildren);
  }

  const savedPerson = await personToUpdate.save();

  return savedPerson;
};

// export const update = async (id: string, dto: updatePersonDto) => {
//   const personToUpdate = await PersonModel.findByIdAndUpdate(
//     {
//       _id: id,
//     },
//     { $set: dto },
//     { new: true },
//   ).exec();

//   if (!personToUpdate) {
//     throw createError(404, 'Person is not found');
//   }

//   // Update father & mother field
//   if (dto.father) {
//     const father = await PersonModel.findById(dto.father).exec();

//     if (father) {
//       father.children = uniqBy(
//         [
//           ...((father.children || []) as unknown as ObjectId[]),
//           personToUpdate._id as ObjectId,
//         ],
//         (item: ObjectId) => item.toString(),
//       ) as unknown as string[];
//       await father.save();
//     }
//   } else {
//     const father = await PersonModel.findById(personToUpdate.father).exec();

//     if (father) {
//       console.log(father);
//       father.children = (father.children || []).filter(
//         (_id) => _id.toString() !== id,
//       );

//       await father.save();
//     }
//   }

//   if (dto.mother) {
//     const mother = await PersonModel.findById(dto.mother).exec();

//     if (mother) {
//       mother.children = uniqBy(
//         [
//           ...((mother.children || []) as unknown as ObjectId[]),
//           personToUpdate._id as ObjectId,
//         ],
//         (item: ObjectId) => item.toString(),
//       ) as unknown as string[];
//       await mother.save();
//     }
//   } else {
//     const mother = await PersonModel.findById(personToUpdate.mother).exec();

//     if (mother) {
//       mother.children = (mother.children || []).filter(
//         (_id) => _id.toString() !== id,
//       );

//       await mother.save();
//     }
//   }

//   // Update children
//   if (dto.children !== undefined) {
//     // Remove previous father/mother from children who are no longer included
//     const previousChildren = personToUpdate.children || [];
//     for (const childId of previousChildren) {
//       if (!dto.children.includes(childId as string)) {
//         const child = await PersonModel.findById(childId);
//         if (child) {
//           if (personToUpdate.gender === 'male') {
//             child.father = null;
//           } else if (personToUpdate.gender === 'female') {
//             child.mother = null;
//           }
//           await child.save();
//         }
//       }
//     }

//     // Add/update father/mother for new/remaining children
//     for (const childId of dto.children) {
//       const child = await PersonModel.findById(childId);

//       if (child) {
//         if (personToUpdate.gender === 'male') {
//           child.father = personToUpdate._id;
//         } else if (personToUpdate.gender === 'female') {
//           child.mother = personToUpdate._id;
//         }

//         await child.save();
//       }
//     }

//     personToUpdate.children = dto.children;
//   }

//   const savedPerson = await personToUpdate.save();

//   return savedPerson;
// };

export const remove = async (id: string) => {
  try {
    const deletePerson = await PersonModel.findByIdAndRemove(id);
    return deletePerson;
  } catch (error) {
    throw createError(400, (error as Error).message);
  }
};
