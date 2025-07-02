import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function maskCNPJ(cnpj: string): string {
    // Remove tudo o que não for número
    cnpj = cnpj.replace(/\D/g, '');

    // Aplica a máscara de CNPJ (XX.XXX.XXX/XXXX-XX) se tiver o comprimento suficiente
    if (cnpj.length <= 14) {
        cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    }

    return cnpj;
}

export function formatStringName(value: string): string {
    // Remove caracteres que não sejam letras, números ou espaços
    const sanitized = value.replace(/[^a-zA-Z0-9 ]+/g, '');
    // Substitui múltiplos espaços consecutivos por um único underline
    const singleSpaced = sanitized.replace(/\s+/g, '');
    // Garante que não está removendo sublinhados já existentes
    return singleSpaced.trim().toLowerCase();
}

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export function formatPrice(value: string) {
    // Remove tudo que não for número
    const rawValue = value.replace(/[^\d]/g, '');

    // Divide por 100 para ajustar para centavos
    const numericValue = parseFloat(rawValue) / 100;

    // Formata para o padrão brasileiro
    const formattedValue = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numericValue);

    return formattedValue == 'NaN' ? '0' : formattedValue;
}

export function dateToUnixTimestamp(date: Date): number {
    return Math.floor(date.getTime() / 1000);
}

export function unixTimestampToDate(timestamp: number): Date {
    return new Date(timestamp * 1000);
}

export const dateExtFormatter = (date: string) => {
    if (!date) return 'Sem dados';
    return format(parseISO(date), `'dia' dd MMMM yyyy 'às' HH:mm`, {
        locale: ptBR,
    });
};

export const timestampToDateTime = (timestamp: number): string => {
    // Se o timestamp estiver em segundos (10 dígitos), convertemos para milissegundos
    if (timestamp.toString().length === 10) {
        timestamp *= 1000;
    }

    const date: Date = new Date(timestamp);
    return date.toLocaleString(); // Retorna no fuso horário local
};

export function formatterCep(cep: string | number): string {
    const onlyNumbers = String(cep).replace(/\D/g, '');

    if (onlyNumbers.length === 8) {
        return onlyNumbers.replace(/^(\d{5})(\d{3})$/, '$1-$2');
    }

    return onlyNumbers;
}

export function formatCPFOrCNPJ(value: string | number): string {
    const onlyNumbers = String(value).replace(/\D/g, '');

    if (onlyNumbers.length === 11) {
        // Format as CPF: 000.000.000-00
        return onlyNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    if (onlyNumbers.length === 14) {
        // Format as CNPJ: 00.000.000/0000-00
        return onlyNumbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    // Return raw input if it's neither valid CPF nor CNPJ
    return onlyNumbers;
}

export function formatPhone(value: string | number): string {
    const onlyNumbers = String(value).replace(/\D/g, '');

    if (onlyNumbers.length === 10) {
        // Landline: (XX) XXXX-XXXX
        return onlyNumbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    if (onlyNumbers.length === 11) {
        // Mobile: (XX) 9XXXX-XXXX
        return onlyNumbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    return onlyNumbers;
}

export function formatDateTimeMask(input: string): string {
    const digits = input.replace(/\D/g, '').slice(0, 14); // garante até 14 números

    const day = digits.slice(0, 2);
    const month = digits.slice(2, 4);
    const year = digits.slice(4, 8);
    const hour = digits.slice(8, 10);
    const minute = digits.slice(10, 12);
    const second = digits.slice(12, 14);

    let result = '';

    if (day) result += day;
    if (month) result += '/' + month;
    if (year) result += '/' + year;

    if (hour) {
        result += ' às ' + hour;
        if (minute) result += ':' + minute;
        if (second) result += ':' + second;
    }

    return result;
}
