export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export interface ICategory {
  [x: string]: any;
  id: string;
  title: string;
  imageUrl: string;
  courses: ICourse[];
  createdAt: string;
  updatedAt: string;

}
export interface INotification {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;

}
export interface IBlogs {

  id: string;
  title: string;
  contents: string;
  imageUrl: string;


}
export interface ICourse {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  status: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  category: {
    title: string;
  };

}
export interface ISubject {
  id: string;
  title: string;
}


export interface IProfile {

  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  profileImage: string;
  useEmail: string;
  contactNo: string;
  bio: string;
  userId: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  iat: number;
  exp: number;

}
export interface BookingResponse {
  id: string;
  userId: string;
  status: "PENDING" | "SHIPPED" | "DELIVERED";
  startDate: string;
  endDate: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  course: {
    title: string;
  };
  user: {
    email: string;
  };
}

export interface IUserResponse {
  id: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}


export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type SelectOptions = {
  label: string;
  value: string;
};
export interface Name {
  firstName: string;
  lastName: string;
  middleName: string;
}


export interface IReview {
  [x: string]: any;
  imageUrl: string;
  user: any;

  id: string;
  review: string;
  rating: number;
  courseId: string;
  userId: string;
}

