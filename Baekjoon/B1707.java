import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.List;
import java.util.StringTokenizer;



public class B1707 {
    public static class Pt {
        int value;
        int status;
        List<Integer> neighbor;

        Pt(int value){
            this.value = value;
            this.status=0;
            this.neighbor = new LinkedList<>();
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int testCnt = Integer.parseInt(st.nextToken());
        for (int i=0; i<testCnt; i++){
            st = new StringTokenizer(br.readLine());
            int vCnt = Integer.parseInt(st.nextToken());
            int eCnt = Integer.parseInt(st.nextToken());
            Pt[] info = new Pt[vCnt+1];
            for (int j=1; j<=vCnt; j++)
                info[j] = new Pt(j);
            for (int j=0; j<eCnt; j++){
                st = new StringTokenizer(br.readLine());
                int p1 = Integer.parseInt(st.nextToken());
                int p2 = Integer.parseInt(st.nextToken());
                info[p1].neighbor.add(p2);
                info[p2].neighbor.add(p1);
            }
            solution(info, vCnt);
        }
    }

    public static void solution(Pt[] info, int vCnt){
        for (int i=1; i<=vCnt; i++){
            if (info[i].status == 0 && paint(info, i, 1) == -1){
                System.out.println("NO");
                return;
            }
        }
        System.out.println("YES");
        return;
    }
    // 1 과 -1로 채울수 없을 때는 -1반환, 정상종료 1반환
    public static int paint(Pt[] info, int startV, int statusV){
        info[startV].status = statusV;
        for (int i:info[startV].neighbor){
            if (info[i].status == statusV)
                return -1;
            else if (info[i].status ==0 && paint(info, i, statusV * -1) == -1)
                return -1;
        }
        return 1;
    }

}
