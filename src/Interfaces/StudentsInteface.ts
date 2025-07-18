export interface Group {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: string[];
  max_students: number;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
  group: Group;
}

export interface IStudent {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: boolean;
  role: string;
  group: {
    _id: string;
    name: string;
    status: boolean;
    instructor: string;
    students: [string];
    max_students: number;
    updatedAt: string;
    createdAt: string;
    __v: 0;
  };
}