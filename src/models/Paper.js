class Paper {
  constructor (data) {
    this.id = data.paperId;
    this.title = data.title;
    this.authors = data.authors.split(",");
    // this.categoryId = arg.categoryId;
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
  }
}

export default Paper;