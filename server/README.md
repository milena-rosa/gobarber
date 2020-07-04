# Recuperação de senha

**RF (Requisitos Funcionais)**

- [x] O usuário deve poder recuperar sua senha informando seu e-mail;
- [x] O usuário deve receber um e-mail com instruções de recuperação de senha;
- [x] O usuário deve poder restaurar sua senha.

**RNF (Requisitos não funcionais)**

- [x] Utilizar Ethereal Mail para testar envios em ambiente de desenvolvimento.
- [ ] Utilizar Amazon SES para envios em produção.
- [ ] O envio de e-mails deve acontecer em segundo plano (_background job_).

**RN (Regras de negócio)**

- [ ] O link enviado por e-mail para restaurar senha deve expirar em 2 horas;
- [ ] O usuário precisa confirmar a nova senha durante a restauração da senha.

# Atualização do perfil

**RF (Requisitos Funcionais)**

- [x] O usuário deve poder atualizar seu nome, e-mail, senha e avatar.

**RN (Regras de negócio)**

- [x] O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- [x] Para atualizar sua senha, o usuário deve informar a senha antiga;
- [ ] Para atualizar sua senha, o usuário deve confirmar a nova senha.

# Painel do prestador

**RF (Requisitos Funcionais)**

- [ ] O usuário deve poder listar seus agendamentos de um dia específico;
- [ ] O prestador deve receber uma notificação sempre que houver um novo agendamento;
- [ ] O prestador deve poder visualizar as notificações não lidas.

**RNF (Requisitos não funcionais)**

- [ ] Os agendamentos do prestador no dia devem ser armazenados em cache;
- [ ] As notificações do prestador devem ser armazenadas no MongoDB;
- [ ] As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io.

**RN (Regras de negócio)**

- [ ] A notificação deve ter um status de lida/não lida para que o prestador possa controlar.

# Agendamento de serviços

**RF (Requisitos Funcionais)**

- [x] O usuário deve poder listar todos os prestadores de serviço cadastrados;
- [ ] O usuário deve poder visualizar os dias de um mês com, pelo menos, um horário disponível de um determinado prestador;
- [ ] O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- [ ] O usuário deve poder realizar um novo agendamento com um prestador.

**RNF (Requisitos não funcionais)**

- [ ] A listagem de prestadores deve ser armazenada em cache.

**RN (Regras de negócio)**

- [ ] Cada agendamento deve durar 1 hora;
- [ ] Os agendamentos devem estar disponíveis das 8h às 18h (primeiro às 8h, último às 17h);
- [ ] O usuário não pode agendar em um horário já ocupado;
- [ ] O usuário não pode agendar em um horário que já passou;
- [ ] O usuário não pode agendar serviços consigo mesmo.
