export const config = {
  baseBoardsUrl:
    import.meta.env.VITE_BASE_BOARDS_API_URL ,

  baseListsUrl:
    import.meta.env.VITE_BASE_LISTS_API_URL ,

  baseCardsUrl:
    import.meta.env.VITE_BASE_CARDS_API_URL,

  baseChecklistsUrl:
    import.meta.env.VITE_BASE_CHECKLISTS_API_URL ,

  baseChecklistItemUrl:
    import.meta.env.VITE_BASE_CHECKLIST_ITEM_API_URL ,

  key: import.meta.env.VITE_API_KEY,
  token: import.meta.env.VITE_API_TOKEN,
};
