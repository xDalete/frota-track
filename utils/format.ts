import dayjs from "./dayjs";

export const formatFullDateTime = (date: string): string => {
  return dayjs.utc(date).tz().format("DD/MM/YYYY HH:mm:ss");
};

export const formatDate = (date: string): string => {
  return dayjs.utc(date).tz().format("DD/MM/YYYY");
};

export const formatTime = (date: string): string => {
  return dayjs.utc(date).tz().format("HH:mm:ss");
};

export const formatShortDateTime = (date: string): string => {
  return dayjs.utc(date).tz().format("DD/MM HH:mm");
};

export const formatShortDate = (date: string): string => {
  return dayjs.utc(date).tz().format("DD/MM");
};

export const formatShortTime = (date: string): string => {
  return dayjs.utc(date).tz().format("HH:mm");
};

export const clearNumber = (value = "") => {
  return value.replace(/\D+/g, "");
};

export const clearAlphanumeric = (value = "") => {
  return value.replace(/[^0-9a-zA-Z]+/g, "");
};

export function formatTelefone(telefone: string) {
  const value = clearNumber(telefone);

  return value
    .substring(0, 11)
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
}

export function formatCep(cep: string) {
  const value = clearNumber(cep);

  return value.substring(0, 8).replace(/(\d{5})(\d{3})$/, "$1-$2");
}

export function formatCpf(cpf: string) {
  const value = clearNumber(cpf);

  return value
    .substring(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function formatCnpj(cnpj: string): string {
  const value = clearAlphanumeric(cnpj).toUpperCase();

  const part1 = value
    .substring(0, 12)
    .replace(/([0-9A-Z]{2})([0-9A-Z])/, "$1.$2")
    .replace(/([0-9A-Z]{3})([0-9A-Z])/, "$1.$2")
    .replace(/([0-9A-Z]{3})([0-9A-Z]{4})/, "$1/$2");

  const part2 = clearNumber(value.substring(12, 14));

  return `${part1}${part2 ? "-" + part2 : ""}`;
}
