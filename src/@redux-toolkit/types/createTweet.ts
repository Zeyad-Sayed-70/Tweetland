export interface REQUEST {
    isRetweet?: boolean,
    pid?: string,
    token: string,
    type: string,
    content: { text: string, url?: string },
    creator_data: {
        _id: string,
        username: string,
        tagName: string,
        avatar?: string
    }
  }