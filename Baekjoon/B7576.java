import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;



public class B7576 {
    public static class Point{
        int row;
        int col;
        int time;

        Point(int row, int col, int time){
            this.row = row;
            this.col = col;
            this.time = time;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int w = Integer.parseInt(st.nextToken());
        int h = Integer.parseInt(st.nextToken());
        int [][] tomatoMap = new int[h][w];
        for (int i=0; i<h; i++){
            st = new StringTokenizer(br.readLine());
            for (int j=0; j<w; j++)
                tomatoMap[i][j] = Integer.parseInt(st.nextToken());
        }
        int ans = solution(tomatoMap, w, h);
        System.out.println(ans);
    }

    public static int solution(int[][] tomatoMap, int w, int h){
        int zeroCnt = 0;
        int time = 0;
        Queue<Point> queue = new LinkedList();
        for (int i=0; i<h; i++){
            for (int j=0; j<w; j++){
                if (tomatoMap[i][j] == 0)
                    zeroCnt++;
                if (tomatoMap[i][j] == 1)
                    queue.add(new Point(i,j,0));
            }
        }
        while (!queue.isEmpty()){
            Point p = queue.poll();
            if (p.time > time)
                time = p.time;
            zeroCnt = search(w, h, tomatoMap, p, queue, zeroCnt);
        }
        if (zeroCnt > 0)
            return -1;
        return time;
    }

    public static int search(int w, int h, int[][] tomatoMap, Point p, Queue queue, int zeroCnt){
        int row = p.row;
        int col = p.col;
        int time = p.time;

        if (row - 1 >= 0 && tomatoMap[row-1][col] == 0){
            tomatoMap[row-1][col] = 1;
            zeroCnt--;
            queue.add(new Point(row-1,col,time+1));
        }
        if (row + 1 <h && tomatoMap[row+1][col] == 0){
            tomatoMap[row+1][col] = 1;
            zeroCnt--;
            queue.add(new Point(row+1, col, time+1));
        }
        if (col - 1 >= 0 && tomatoMap[row][col-1] == 0){
            tomatoMap[row][col-1] = 1;
            zeroCnt--;
            queue.add(new Point(row, col-1, time+1));
        }
        if (col + 1 <w && tomatoMap[row][col+1] == 0){
            tomatoMap[row][col+1] = 1;
            zeroCnt--;
            queue.add(new Point(row, col+1, time+1));
        }
        return zeroCnt;
    }
}
