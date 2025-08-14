package com.mycompany.projetointegrador.DAO;

import java.sql.Connection;
import java.sql.SQLException;

public class TesteConexao {
    public static void main(String[] args) {
        try (Connection conn = Conexao.getConnection()) {
            System.out.println("Conexão OK: " + conn);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
