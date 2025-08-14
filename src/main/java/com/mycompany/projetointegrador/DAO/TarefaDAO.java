package com.mycompany.projetointegrador.DAO;

import com.mycompany.projetointegrador.modelo.Tarefa;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TarefaDAO {

    public void inserir(Tarefa tarefa) throws SQLException {
        String sql = "INSERT INTO tarefa (nome, email, categoria, observacoes, concluida) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, tarefa.getNome());
            stmt.setString(2, tarefa.getEmail());
            stmt.setString(3, tarefa.getCategoria());
            stmt.setString(4, tarefa.getObservacoes());
            stmt.setBoolean(5, tarefa.isConcluida());
            stmt.executeUpdate();
        }
    }

    public List<Tarefa> listar() throws SQLException {
        List<Tarefa> lista = new ArrayList<>();
        String sql = "SELECT * FROM tarefa";
        try (Connection conn = Conexao.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                Tarefa t = new Tarefa();
                t.setId(rs.getInt("id"));
                t.setNome(rs.getString("nome"));
                t.setEmail(rs.getString("email"));
                t.setCategoria(rs.getString("categoria"));
                t.setObservacoes(rs.getString("observacoes"));
                t.setConcluida(rs.getBoolean("concluida"));
                lista.add(t);
            }
        }
        return lista;
    }

    public void excluir(int id) throws SQLException {
        String sql = "DELETE FROM tarefa WHERE id = ?";
        try (Connection conn = Conexao.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }
}
