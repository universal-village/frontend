class Paper {
  constructor (data) {
    this.id = data.paperId;
    this.title = data.title;
    this.authors = data.users;
    this.categoryId = data.categoryId;
    this.category = {
      id: Number.parseInt(data.category.categoryId),
      name: data.category.name,
    };
    this.keywords = data.keywords.split(",");
    this.link = data.link;
    this.phase = data.phase;
    this.paperAbstract = data.paperAbstract;
    this.users = data.users;
    this.reviews = data.reviews;

    this.canEdit = ["DRAFT", "TO_BE_REVISED"].includes(data.phase);
  }
}

export default Paper;