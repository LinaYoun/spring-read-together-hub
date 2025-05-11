
import React, { useState } from 'react';
import { toast } from 'sonner';
import { CheckCircle2, XCircle, UserCheck, UserX } from 'lucide-react';

import Layout from '@/components/Layout';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Define UserStatus type to match the expected type in our application
type UserStatus = 'pending' | 'approved' | 'rejected';

// Define User interface
interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  registeredAt: string;
  status: UserStatus;
}

// Mock data for pending users
// In a real app, this would come from your backend
const initialUsers: User[] = [
  { id: 1, username: 'janesmith', name: 'Jane Smith', email: 'jane@example.com', registeredAt: '2025-05-10', status: 'pending' },
  { id: 2, username: 'markjohnson', name: 'Mark Johnson', email: 'mark@example.com', registeredAt: '2025-05-09', status: 'pending' },
  { id: 3, username: 'saraconnor', name: 'Sara Connor', email: 'sara@example.com', registeredAt: '2025-05-08', status: 'pending' },
  { id: 4, username: 'robertkim', name: 'Robert Kim', email: 'robert@example.com', registeredAt: '2025-05-07', status: 'approved' },
  { id: 5, username: 'emilywong', name: 'Emily Wong', email: 'emily@example.com', registeredAt: '2025-05-06', status: 'rejected' },
];

const Admin = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [filter, setFilter] = useState<UserStatus | 'all'>('pending');

  const handleApprove = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: 'approved' } : user
    ));
    toast.success("User approved successfully", {
      description: "The user can now log in to their account"
    });
  };

  const handleReject = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: 'rejected' } : user
    ));
    toast.error("User rejected", {
      description: "The user has been denied access"
    });
  };

  const filteredUsers = filter === 'all' 
    ? users 
    : users.filter(user => user.status === filter);

  const getStatusBadge = (status: UserStatus) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <Card className="border border-bookish-maroon/20">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-bookish-maroon">Admin Dashboard</CardTitle>
            <CardDescription>
              Manage user registration requests and member approvals
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex space-x-2 mb-4">
              <Button 
                variant={filter === 'all' ? "default" : "outline"} 
                onClick={() => setFilter('all')}
                className={filter === 'all' ? "bg-bookish-maroon" : ""}
              >
                All
              </Button>
              <Button 
                variant={filter === 'pending' ? "default" : "outline"} 
                onClick={() => setFilter('pending')}
                className={filter === 'pending' ? "bg-bookish-maroon" : ""}
              >
                Pending
              </Button>
              <Button 
                variant={filter === 'approved' ? "default" : "outline"} 
                onClick={() => setFilter('approved')}
                className={filter === 'approved' ? "bg-bookish-maroon" : ""}
              >
                Approved
              </Button>
              <Button 
                variant={filter === 'rejected' ? "default" : "outline"} 
                onClick={() => setFilter('rejected')}
                className={filter === 'rejected' ? "bg-bookish-maroon" : ""}
              >
                Rejected
              </Button>
            </div>
            
            <Table>
              <TableCaption>User registration requests</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.registeredAt}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-right">
                      {user.status === 'pending' && (
                        <div className="flex justify-end gap-2">
                          <Button 
                            onClick={() => handleApprove(user.id)} 
                            variant="outline" 
                            size="sm"
                            className="text-green-600 border-green-600 hover:bg-green-50"
                          >
                            <UserCheck className="mr-1 h-4 w-4" /> Approve
                          </Button>
                          <Button 
                            onClick={() => handleReject(user.id)} 
                            variant="outline" 
                            size="sm"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <UserX className="mr-1 h-4 w-4" /> Reject
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No users found matching the selected filter.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Admin;
