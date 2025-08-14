package com.mycompany.projetointegrador.controller;

import com.google.gson.Gson;
import com.mycompany.projetointegrador.DAO.TarefaDAO;
import com.mycompany.projetointegrador.modelo.Tarefa;


import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

import java.io.*;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/tarefas")
public class TarefaServlet extends HttpServlet {

    private final TarefaDAO dao = new TarefaDAO();
    private final Gson gson = new Gson();

    @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    System.out.println(">>> Entrou no doGet do TarefaServlet <<<");
    try {
        List<Tarefa> lista = dao.listar();
        String json = gson.toJson(lista);
        response.setContentType("application/json");
        response.getWriter().write(json);
    } catch (SQLException e) {
        e.printStackTrace();
        response.setStatus(500);
    }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try (BufferedReader reader = request.getReader()) {
            Tarefa tarefa = gson.fromJson(reader, Tarefa.class);
            dao.inserir(tarefa);
            response.setStatus(201);
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(500);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            int id = Integer.parseInt(request.getParameter("id"));
            dao.excluir(id);
            response.setStatus(200);
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(500);
        }
    }
}
