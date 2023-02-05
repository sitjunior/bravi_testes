/*!
 * Routes.js
 *
 * Controle de Roteamento
 * @author TENFEN JUNIOR, Silvio <silvio@tenfen.com.br>
 * @version 1.0
 * @package backend
 */

import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import ListQuestions from "views/ListQuestions.jsx";
import QuestionForm from "views/QuestionForm.jsx";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/questoes/adicionar",
    name: "Questões",
    component: QuestionForm,
    layout: "/admin"
  },
  {
    path: "/questoes/editar",
    name: "Questões",
    component: QuestionForm,
    layout: "/admin"
  },
  {
    path: "/questoes",
    name: "Questões",
    component: ListQuestions,
    layout: "/admin"
  },
  {
    path: "/meu-usuario",
    name: "Meu Usuário",
    component: UserProfile,
    layout: "/admin"
  },
];

export default routes
