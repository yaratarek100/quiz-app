import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { privateUserAxiosInstance } from "@/services/Axiosinstance"
import { GROUPS_URLS, STUDENTS_URLS } from "@/services/Urls"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import type { Group } from "../Groups/Groups"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { AxiosError } from "axios"





interface IStudent {
  _id: string
  first_name: string
  last_name: string
}


interface GroupFormValues {
  name: string
}

export function GroupForm({
  openAddDialog,
  setOpenAddDialog,
  fetchGroups,
  groupToEdit
}: {
  openAddDialog: boolean
  setOpenAddDialog: (open: boolean) => void
  fetchGroups: () => void
  groupToEdit?: Group | null
}) {


  const [students, setStudents] = useState<IStudent[]>([])
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])

  const { register, handleSubmit, reset } = useForm<GroupFormValues>()


  const getAllStudent = async () => {
    try {
      const response = await privateUserAxiosInstance.get(STUDENTS_URLS.allStudents)
      setStudents(response.data)
    } catch (error) {
      console.log(error)
    }
  }


  const onSubmit = async (data: GroupFormValues) => {
    try {
      const payload = {
        ...data,
        students: selectedStudents
      };


      if (groupToEdit) {
        // Edit
        const response = await privateUserAxiosInstance.put(
          GROUPS_URLS.editGroup(groupToEdit._id),
          payload
        );

        toast.success(response.data.message)
      } else {
        // Add
        const response = await privateUserAxiosInstance.post(
          GROUPS_URLS.addGroup,
          payload
        );

        toast.success(response.data.message)
      }

      fetchGroups();
      setOpenAddDialog(false);
      setSelectedStudents([]);
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error.response?.data.message || "Something Went Wrong");
      }

      setOpenAddDialog(false);
    }
  };




  useEffect(() => {
    getAllStudent()
  }, [])


  useEffect(() => {
    if (groupToEdit) {
      reset({
        name: groupToEdit.name
      });
      setSelectedStudents(groupToEdit.students || []);
    } else {
      reset();
      setSelectedStudents([]);
    }
  }, [groupToEdit, reset]);

  const toggleValue = (value: string) => {
    if (selectedStudents.includes(value)) {
      setSelectedStudents(selectedStudents.filter((v) => v !== value))
    } else {
      setSelectedStudents([...selectedStudents, value])
    }
  }


  return (
    <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>

          <DialogTitle> {groupToEdit ? "Update Group" : "Set up a new Group"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* Group Name */}
            <div className="relative col-span-3">
              <label
                htmlFor="name"
                className="absolute left-0 top-0 text-sm bg-[#FFEDDF] text-black px-2 py-2 z-10 rounded"
              >
                Group Name
              </label>
              <Input
                id="name"
                className="pl-[120px] py-2"
                {...register("name", { required: true })}
              />
            </div>

            {/* Students Selector */}
            <div className="relative col-span-3">
              <label
                htmlFor="ListStudents"
                className="absolute left-0 top-0 text-sm bg-[#FFEDDF] text-black px-2 py-2 z-10 rounded"
              >
                List Students
              </label>


              <Popover >
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start pl-[120px]">
                    {selectedStudents.length > 0
                      ? selectedStudents
                        .map((val) => {
                          const student = students.find((s) => s._id === val)
                          return student ? `${student.first_name} ${student.last_name}` : ""
                        })
                        .join(", ")
                      : " Select Student"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px]" side="bottom">
                  <div className="flex flex-col space-y-2 max-h-[200px] overflow-y-auto">
                    {students.map((student) => (
                      <label key={student._id} className="flex items-center space-x-2">
                        <Checkbox
                          checked={selectedStudents.includes(student._id)}
                          onCheckedChange={() => toggleValue(student._id)}
                        />
                        <span>{student.first_name} {student.last_name}</span>
                      </label>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>


          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="border border-gray-500 p-2 rounded-full px-4 flex items-center space-x-2 
              hover:bg-gray-100 hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
