import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "../../Common/Modal";
import { Input } from "../../Common/Forms/Input";
import { Button } from "../../Common/Forms/Button";
import { GroupInput } from "../../Common/Forms/GroupInput";
import { getAllBoardsState } from "../../../store/slices/board";
import { IBoardObjectProps } from "../../../interfaces/board";
import { newTaskFormSchema } from "../../../validation/taskSchema";
import { renderSuccessMessage, renderErrorMessage } from "../../../helper/toaster";
import { IFormModalProps } from "../../../interfaces/common";
import { Textarea } from "../../Common/Forms/Textarea";
import { Select } from "../../Common/Forms/Select";
import { createTask } from "../../../crudServices/task";
import { setBoards, setSingleBoard } from "../../../store/slices/board";
import { orderData } from "../../../helper/utils";
import { getTasksState, setTask } from "../../../store/slices/task";
import { updateTask } from "../../../crudServices/task";
import { TaskProps } from "../../../interfaces/task";
import { IColumnProps } from "../../../interfaces/column";

type TaskFormType = z.infer<typeof newTaskFormSchema>;

const initalSubtask = [
  {title: '', isComplete: false},
]

export const TaskFormModal:FC<IFormModalProps> = ({
  setShowModal: setShowTaskFormModal,
  mode
}) => {
  const { board, boards } = useSelector(getAllBoardsState);
  const { task } = useSelector(getTasksState);
  const [loading, setLoading] = useState<boolean>(false);
  const exisitingSubtasks = task?.subtasks;
  const currentColumn = board?.columns.find(c => c.name === task.status) as IColumnProps;
  
  const [taskTitle] = useState<string>(task?.title || '');
  const [taskDescription] = useState<string>(task?.description || '');
  const [statuses] = useState<string[]>((board && board.columns.map(col => col.name)) || []);
  const [selectedStatus, setSelectedStatus] = useState(
    task?.status || (board && board.columns.map(col => col.name)[0]) || ''
  );

  const [taskSubtasks, setTaskSubtasks] = useState<any[]>(
    mode === "update" ? (exisitingSubtasks || []) : initalSubtask
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<TaskFormType>({
    resolver: zodResolver(newTaskFormSchema),
  });

  const dispatch = useDispatch();
  
  useEffect(() => {
    setValue('status', selectedStatus);
  }, [selectedStatus])

  const createTaskHandler = async (data: TaskFormType) => {
    try {
      setLoading(true);
      const updatedBoard = await createTask({
        title: data.title,
        description: data.description,
        subtasks: taskSubtasks,
        status: data.status,
        board,
        boards
      });

      const index = await boards.findIndex((b) => b.name === board.name)
      const currentBoards = await orderData(index, boards, updatedBoard)

      await dispatch(setSingleBoard(updatedBoard as IBoardObjectProps));
      await dispatch(setBoards([...currentBoards] as IBoardObjectProps[]));
      setLoading(false);
      setShowTaskFormModal(false);
      renderSuccessMessage('Task saved successfully');
    } catch (err) {
      setLoading(false);
      renderErrorMessage(err as Error);
    }
  };

  const updateTaskHandler = async (data: TaskFormType) => {
    try {
      setLoading(true);
      const [updatedBoard, updatedTask] = await updateTask(
        board,
        currentColumn,
        task,
        data.title,
        data.description,
        taskSubtasks,
        selectedStatus,
        boards
      );

      const index = await boards.findIndex((b) => b.name === board.name)
      const currentBoards = await orderData(index, boards, updatedBoard)

      await dispatch(setTask(updatedTask as TaskProps));
      await dispatch(setSingleBoard(updatedBoard as IBoardObjectProps));
      await dispatch(setBoards([...currentBoards] as IBoardObjectProps[]));
      setShowTaskFormModal(false);
      renderSuccessMessage('Task updated successfully');
    } catch (err) {
      setLoading(false);
      renderErrorMessage(err as Error);
    }
  };

  const handleAddSubtask = () => {
    const newSubtask = '';
    setTaskSubtasks(prev => [...prev, newSubtask])
  }

  const handleRemoveSubtask = (e: any, val: string) => {
    e.preventDefault();
    const filteredTaskSubtasks = taskSubtasks.filter((task) => task != val);
    setTaskSubtasks([...filteredTaskSubtasks])
  }

  const handleSubtaskChange = (e: any) => {
    const {id, value} = e.target;
    const index = Number(id);
    let subtasks = [...taskSubtasks];
    let subtask = subtasks[index];
    subtask = {title: value, isCompleted: false};;
    subtasks[index] = subtask;

    setTaskSubtasks([...subtasks]);
  }

  const setPlaceholder = (index: number) => {
    if (index === 0) return 'e.g. Make coffee';
    return '';
  }

  return (
    <Modal
      title={mode === "update" ? "Edit Task" : "Add New Task"}
      children={
        <form
          className="p-8"
          onSubmit={
            handleSubmit(mode === "update" ? updateTaskHandler : createTaskHandler)
          }
        >
          <Input
            hasLabel={true}
            errors={errors}
            formLabel="Title"
            formTitle="title"
            inputType="text"
            placeholder="e.g. Take coffee break"
            register={register}
            value={mode === "update" ? taskTitle : ""}
          />

          <div className="mt-8">
            <Textarea
              hasLabel={true}
              errors={errors}
              formLabel="Description"
              formTitle="description"
              inputType="text"
              placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
              register={register}
              value={mode === "update" ? taskDescription : ""}
            />
          </div>

          <label
            className="block text-gray-200 text-s font-semibold mb-2 mt-8"
            htmlFor="columns"
          >
            Subtasks
          </label>
          <div className="mb-3">
            {taskSubtasks.map((st, i) => {
              return (
                <GroupInput
                  key={i}
                  inputId={String(i)}
                  removeInput={(e) => handleRemoveSubtask(e, st)}
                  value={st.title}
                  handleChange={(e) => handleSubtaskChange(e)}
                  placeholder={setPlaceholder(i)}
                />
              )
            })}
          </div>
          <div>
            <Button
              secondary
              buttonType="button"
              fullwidth
              roundedBG
              large
              title="Add New Subtask"
              handleClick={() => handleAddSubtask()}
              disabled={taskSubtasks[taskSubtasks.length - 1] === ''}
            />
          </div>

          <Select
            formLabel="Status"
            formTitle="status"
            optionsData={statuses}
            selected={selectedStatus}
            setSelected={setSelectedStatus}
          />

          <div>
            <Button
              primary
              fullwidth
              roundedBG
              large
              buttonType="submit"
              title={mode === "update" ? "Save Changes" : "Create Task"}
              disabled={loading}
            />
          </div>
        </form>
      }
      setShowModal={setShowTaskFormModal}
    />
  )
};
