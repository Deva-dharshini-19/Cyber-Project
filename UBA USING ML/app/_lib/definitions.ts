export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    status: string;
    role: string;
    column_7: string | null;
    column_8: string | null;
  }
  
  export interface Activity {
    id: number;
    loginTime: string; // Use Date if the object will be parsed into a Date instance
    logoutTime: string | null; // Use Date | null if you'll handle dates
    ipAddress: string;
    type: string;
    column_6: string | null;
    column_7: string | null;
    column_8: string | null;
    userId: number;
    user: User;
  }

 export interface Attack {
    id: number;
    attackType: string;
    ipAddress: string | null;
    timestamp: string; 
  }