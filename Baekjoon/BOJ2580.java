import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class BOJ2580 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        int[][] board = new int[9][9];
        for (int i=0; i<9; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j=0; j<9; j++) {
                board[i][j] = Integer.parseInt(st.nextToken());
            }
        }
        solution(board);
        StringBuffer sb = new StringBuffer();
        for (int i=0; i<9; i++) {
            for (int j=0; j<9; j++) {
                sb.append(board[i][j]);
                sb.append(j == 8 ? '\n' : ' ');
            }
        }
        System.out.println(sb);
    }

    static int[][] solution(int[][] board) {
        ArrayList<Cell> cells = new ArrayList();

        for (int i=0; i<9; i++) {
            for (int j=0; j<9; j++) {
                if (board[i][j] == 0) {
                    cells.add(new Cell(i,j));
                }
            }
        }
        dfs(board, cells, 0);
        return board;

    }

    static boolean dfs(int[][] board, ArrayList<Cell> cells, int index) {
        if (index == cells.size()) {
            return true;
        }
        Cell curr = cells.get(index);
        checkCandidate(curr, board);
        for (int i=0; i<9; i++) {
            if (!curr.candidate[i]) {
                continue;
            }
            board[curr.row][curr.col] = i + 1;
            if (dfs(board, cells, index + 1)) {
                return true;
            }
            board[curr.row][curr.col] = 0;
        }
        return false;
    }

    static void checkCandidate(Cell cell, int[][] board) {
        for (int i=0; i<9; i++) {
            cell.candidate[i] = true;
        }
        int row = cell.row;
        int col = cell.col;
        int rowS = (row / 3) * 3;
        int rowE = rowS + 3;
        int colS = (col / 3) * 3;
        int colE = colS + 3;
        for (int i=0; i<9; i++) {
            if (board[row][i] != 0) {
                cell.candidate[board[row][i] - 1] = false;
            }
            if (board[i][col] != 0) {
                cell.candidate[board[i][col] - 1] = false;
            }
        }
        for (int i=rowS; i<rowE; i++) {
            for (int j=colS; j<colE; j++) {
                if (board[i][j] != 0) {
                    cell.candidate[board[i][j] - 1] = false;
                }
            }
        }
        return;
    }

    static class Cell {
        int row;
        int col;
        boolean[] candidate;

        Cell(int row, int col) {
            this.row = row;
            this.col = col;
            this.candidate = new boolean[9];
        }
    }
}
