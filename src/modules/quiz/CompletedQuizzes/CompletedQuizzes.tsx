import { privateUserAxiosInstance } from "@/services/Axiosinstance";
import { GROUPS_URLS, QUIZ_URLS } from "@/services/Urls";
import { useEffect, useState } from "react";

interface Quiz {
  _id: string;
  title: string;
  group: string;
  participants: number;
  schadule: string;
}

interface GroupMap {
  [groupId: string]: string;
}

export default function CompletedQuizzes() {
  const [completedQuizzes, setCompletedQuizzes] = useState<Quiz[]>([]);
  const [groupNames, setGroupNames] = useState<GroupMap>({});

  const getUpcommingQuizzes = async () => {
    try {
      const result = await privateUserAxiosInstance.get(QUIZ_URLS.getAllCompletedQuizzes);
      const quizzes: Quiz[] = result.data;
      setCompletedQuizzes(quizzes);
      getAllGroupsNames(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const getAllGroupsNames = async (quizzes: Quiz[]) => {
    const groupIds = [...new Set(quizzes.map((quiz) => quiz.group))];
    const groupNameMap: GroupMap = {};

    await Promise.all(
      groupIds.map(async (id) => {
        try {
          const result = await privateUserAxiosInstance.get(GROUPS_URLS.getGroup(id));
          groupNameMap[id] = result.data.name;
        } catch (error) {
          console.error("Error fetching group", id, error);
          groupNameMap[id] = "N/A";
        }
      })
    );

    setGroupNames(groupNameMap);
  };

  useEffect(() => {
    getUpcommingQuizzes();
  }, []);

  return (
    <table className="min-w-full border border-gray-300 rounded-lg border-separate border-spacing-y-4">
      <thead className="bg-[#0D1321]">
        <tr>
          <th className="px-6 py-3 border border-gray-300 text-left text-xs font-medium text-white uppercase tracking-wider rounded-l-xl">
            Title
          </th>
          <th className="px-6 py-3 border border-gray-300 text-left text-xs font-medium text-white uppercase tracking-wider">
            Group name
          </th>
          <th className="px-6 py-3 border border-gray-300 text-left text-xs font-medium text-white uppercase tracking-wider">
            No. of persons in group
          </th>
          <th className="px-6 py-3 border border-gray-300 text-left text-xs font-medium text-white uppercase tracking-wider rounded-r-xl">
            Date
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {completedQuizzes.map((quiz) => (
          <tr key={quiz._id} className="bg-white shadow-sm hover:shadow-md transition rounded-xl">
            <td className="px-6 py-4 border border-gray-300 text-sm text-gray-900 rounded-l-xl">
              {quiz.title}
            </td>
            <td className="px-6 py-4 border border-gray-300 text-sm text-gray-600">
              {groupNames[quiz.group] || "Loading..."}
            </td>
            <td className="px-6 py-4 border border-gray-300 text-sm text-gray-600">
              {quiz.participants}
            </td>
            <td className="px-6 py-4 border border-gray-300 text-sm text-gray-600 rounded-r-xl">
              {new Date(quiz.schadule).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
