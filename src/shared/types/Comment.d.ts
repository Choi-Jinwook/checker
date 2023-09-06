export interface Comment {
  comments: {
    comment: string;
    writer: string;
  }[];
  onClose: () => void;
  userData: any;
}
