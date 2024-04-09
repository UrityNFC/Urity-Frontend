import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { columns } from "./data";
import { getAll } from "../../services/users";

const statusColorMap = {
  Dentro: "success",
  Fuera: "danger",
  Desconocido: "warning",
};

const scrollbarStyle = {
  WebkitOverflowScrolling: "touch",
  scrollbarWidth: "thin",
  scrollbarColor: "#27272a #18181b",
};

export default function UsersTable() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { data } = await getAll();
        // console.log(data);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    loadUsers();
  }, []);

  const avatarPicture = () => {
    const num = Math.floor(Math.random() * 300);
    return `https://rickandmortyapi.com/api/character/avatar/${num}.jpeg`;
  };

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      //Nombre - Name
      case "nombres":
        return (
          <User
            avatarProps={{ radius: "full", src: avatarPicture() }}
            name={cellValue}
          ></User>
        );
      //Carrera - Role
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">Alumno</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.carrera}
            </p>
          </div>
        );
      //localizacionAlumno - Status
      case "localizacionAlumno":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.localizacionAlumno]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      //Edición - Actions
      case "actions":
        return (
          <div className="relative flex items-center gap-3">
            <Tooltip content="Editar datos" color="default">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar alumno">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div
      className="w-full h-5/6 overflow-y-scroll bg-zinc-900 rounded-2xl overflow-hidden"
      data-theme="dark"
      style={scrollbarStyle}
    >
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              className="bg-zinc-800"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={userData}>
          {(item) => (
            <TableRow
              key={item.codigo}
              className="hover:bg-zinc-900 hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}