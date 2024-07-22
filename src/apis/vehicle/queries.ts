import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addVehicle,
  deleteVehicle,
  editVehicle,
  getAllCars,
  getAllPlans,
  getAllShips,
  getVehicleById,
} from ".";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { VehicleModel } from "./type";

const useGetAllCarsQuery = (country: string, enabled?: boolean | undefined) =>
  useQuery({
    queryKey: ["get-all-cars"],
    queryFn: () => getAllCars(country),
    enabled: enabled,
  });

const useGetAllShipsQuery = (country: string, enabled?: boolean | undefined) =>
  useQuery({
    queryKey: ["get-all-ships"],
    queryFn: () => getAllShips(country),
    enabled: enabled,
  });

const useGetAllPlansQuery = (country: string, enabled?: boolean | undefined) =>
  useQuery({
    queryKey: ["get-all-plans"],
    queryFn: () => getAllPlans(country),
    enabled: enabled,
  });

const useGetVehicleByIdQuery = (id: string) =>
  useQuery({
    queryKey: ["get-vehicle-by-id"],
    queryFn: () => getVehicleById(id),
    enabled: !!id,
  });
const useAddVehicleMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-vehicle"],
    mutationFn: (payload: VehicleModel) => addVehicle(payload),
    onSuccess(_data, variable) {
      toast.success(`add ${variable.name} successfully.`);
      navigate(-2);
    },
    onError(_data, variable) {
      toast.error(`failed to add ${variable.name}`);
    },
  });
};

const useEditVehicleMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["edit-vehicle"],
    mutationFn: (payload: VehicleModel) => editVehicle(payload),
    onSuccess(_data, variable) {
      toast.success(`edit ${variable.name} successfully.`);
      navigate(-1);
    },
    onError(_data, variable) {
      toast.error(`failed to edit ${variable.name}`);
    },
  });
};
const useDeleteVehicleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-vehicle"],
    mutationFn: (id: string) => {
      return deleteVehicle(id);
    },
    onSuccess() {
      toast.success(`delete vehicle successfully.`);
      queryClient.invalidateQueries({ queryKey: ["get-all-cars"] });
      queryClient.invalidateQueries({ queryKey: ["get-all-plans"] });
    },
    onError() {
      toast.error(`failed to delete vehicle`);
    },
  });
};

export {
  useGetAllPlansQuery,
  useGetAllCarsQuery,
  useGetAllShipsQuery,
  useGetVehicleByIdQuery,
  useDeleteVehicleMutation,
  useEditVehicleMutation,
  useAddVehicleMutation,
};
