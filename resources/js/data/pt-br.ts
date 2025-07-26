export const breadcrumbs = {
    dashboard: 'Painel de Controlesss',
    settings: 'Configurações',
    'photo-gallery': 'Galeria de Fotos',
    'settings-profile': 'Meu Perfil',
    'settings-password': 'Minha Senha',
    'settings-appearance': 'Aparência',
};

export const formInputs = {
    email: 'Endereço de e-mail',
    password: 'Senha',
    name: 'Nome',
    fullname: 'Nome completo',
    currentPasswird: 'Senha atual',
    newPassword: 'Nova senha',
    confirmPassword: 'Repita a senha',

    placeholders: {
        email: 'Seu e-mail',
        password: 'Sua senha',
        name: 'Seu nome',
        fullname: 'Seu nome completo',
        currentPasswird: 'Sua atual senha',
        newPassword: 'Sua nova senha',
        confirmPassword: 'Confirmar nova senha',
    },
};

export const pages = {
    dashboard: {
        title: 'Painel de Controle',
    },
    settings: {
        title: 'Configurações',
    },
    'photo-gallery': {
        title: 'Galeria de Fotos',
    },
    'settings-password': {
        title: 'Minha Senha',
    },
    'settings-appearance': {
        title: 'Aparência',
        themes: {
            dark: 'Escuro',
            light: 'Claro',
            system: 'Sistema',
        },
        forms: {
            'my-appearance': {
                title: 'Aparência',
                description: 'Atualize as configurações de aparência da sua conta',
            },
            'my-profile': {
                title: 'Informações do perfil',
                description: 'Atualize seu nome e endereço de e-mail',
                'delete-account': {
                    title: 'Excluír conta',
                    description: 'Exclua sua conta e todos os seus recursos',
                    warning: {
                        title: 'Aviso',
                        description: 'Por favor, prossiga com cautela, isso não pode ser desfeito.',
                    },
                },
            },
            'my-password': {
                title: 'Atualizar senha',
                description: 'Certifique-se de que sua conta esteja usando uma senha longa e aleatória para permanecer segura',
            },
        },
    },
};

export const alerts = {
    'delete-account': {
        title: 'Tem certeza de que deseja excluir sua conta?',
        description:
            'Após a exclusão da sua conta, todos os seus recursos e dados também serão excluídos permanentemente. Digite sua senha para confirmar que deseja excluir sua conta permanentemente.',
    },
};

export const buttons = {
    'delete-account': 'Excluír conta',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
};
