import CategoryAPI from "../lib/api/CategoryAPI";

export const useCategory = () => {
  const createCategory = async (body) => {
    const data = await CategoryAPI.createCategory(body);
    if (!data.success) {
      return alert(data.msg);
    }
    return data;
  };

  const deleteCategory = async (categoryName) => {
    if (
      window.confirm(
        "폴더를 삭제하면 해당 폴더의 메모들도 삭제됩니다. 삭제하시겠습니까?"
      )
    ) {
      const data = await CategoryAPI.deleteCategory(categoryName);
      if (!data.success) {
        return alert(data.msg);
      }
      return data;
    }
  };

  return { createCategory, deleteCategory };
};
