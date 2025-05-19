import { privateUserAxiosInstance } from "@/services/Axiosinstance";
import { GROUPS_URLS } from "@/services/Urls";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import DeleteConfirmation from "@/modules/shared/Delet-Confirmation/Delet-Confirmation";

import { GroupForm } from "../Group-Form/Group-Form";
import LoadingScreen from "@/modules/shared/Loading-Screen/Loading-Screen";

export interface Group {
  _id: string;
  name: string;
  status: "active" | "inactive";
  instructor: string;
  students: string[];
  max_students: number;
}

import type{ Group } from "@/Interfaces/QuizInterface";



export default function Groups() {
  const [groupsData, setGroupsData] = useState<Group[]>();
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<string>();
  const [groupToEdit, setGroupToEdit] = useState<Group | null>(null);
  const [isLoading,setIsLoading]=useState(false)

  const handleEditClick = (group: Group) => {
    setGroupToEdit(group);
    setOpenAddDialog(true);
  };


  console.log("groupToDelete", groupToDelete);

  //fetchGroups
  const fetchGroups = async () => {
      setIsLoading(true)
    try {
    
      const response = await privateUserAxiosInstance.get(
        GROUPS_URLS.getAllGroups
      );
      console.log("response", response.data);
      setGroupsData(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Something Went Wrong");
      }
    }finally{
        setIsLoading(false)
    }
  };
  useEffect(() => {
    fetchGroups();
  }, []);
  //handleDelete
  const handleDelete = async (groupId: string) => {
    if (!groupId) return;
    try {
      const response = await privateUserAxiosInstance.delete(
        GROUPS_URLS.deleteGroup(groupId)


      );
      console.log(response);
      toast.success("Group deleted successfully");
      fetchGroups();
      setOpenDialog(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Something Went Wrong");
      }
    }
  };
  //handleDeleteClick
  const handleDeleteClick = (groupId: string) => {
    setGroupToDelete(groupId);
    setOpenDialog(true);
  };


if (isLoading) return <LoadingScreen/> 
  return (
    <div className="w-full max-w-6xl m-auto p-4 border border-gray-400 rounded-lg">
      <div className="flex items-center justify-between pb-5">
        <h1 className="text-xl">Groups list</h1>

        <div className="flex items-center">

          <div
            onClick={() => { setGroupToEdit(null); setOpenAddDialog(true); }}
            className="border border-gray-500 p-2 rounded-full px-4 flex items-center space-x-2 
    hover:bg-gray-100 hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <FaPlus className="text-xl text-white bg-black rounded-full p-0.5" />

            <h3 className="text-lg font-semibold" >Add Group</h3>
          </div>


        </div>
      </div>

      {groupsData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groupsData.map((group) => (
            <div
              key={group._id}
              className="p-4 border border-gray-300 rounded transition-all duration-300 hover:shadow-lg hover:scale-102 hover:bg-gray-50 flex justify-between"
            >
              <div>
                <h2 className="text-xl font-bold mb-2">Group: {group.name}</h2>
                <p>Students: {group.students.length}</p>
              </div>

              <div className="flex space-x-4 text-sm items-center">
                <div
                  className="flex items-center space-x-1 text-red-600 cursor-pointer hover:scale-105"
                  onClick={() => handleDeleteClick(group._id)}
                >
                  <FaRegTrashCan />
                  <span>Delete</span>
                </div>
                <div onClick={() => handleEditClick(group)} className="flex items-center space-x-1 text-blue-600 cursor-pointer hover:scale-105">
                  <FaRegEdit />
                  <span>Edit</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog to confirm deletion */}
      <DeleteConfirmation
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        itemType="Group"
        handleDelete={() => groupToDelete && handleDelete(groupToDelete)}
      />

      {openAddDialog && <GroupForm
        openAddDialog={openAddDialog}
        setOpenAddDialog={setOpenAddDialog}
        fetchGroups={fetchGroups}
        groupToEdit={groupToEdit}
      />}
    </div>
  );
}
