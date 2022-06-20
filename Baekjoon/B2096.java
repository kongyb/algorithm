import java.io.*;
import java.util.StringTokenizer;

public class B2096 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int rowCnt = Integer.parseInt(st.nextToken());
        int[] min = new int[3];
        int[] max = new int[3];
        int[] layer = new int[3];
        for (int i=0; i<rowCnt; i++){
            st = new StringTokenizer(br.readLine());
            layer[0] = Integer.parseInt(st.nextToken());
            layer[1] = Integer.parseInt(st.nextToken());
            layer[2] = Integer.parseInt(st.nextToken());
            if (i == 0) {
                max[0] = layer[0];
                max[1] = layer[1];
                max[2] = layer[2];
                min[0] = layer[0];
                min[1] = layer[1];
                min[2] = layer[2];
            }
            else{
                minSum(min, layer);
                maxSum(max, layer);
            }
        }
        System.out.printf("%d %d",Math.max(max[0], Math.max(max[1], max[2])), Math.min(min[0], Math.min(min[1], min[2])));
    }

    public static void minSum(int[] min,int[] layer){
        int min0 = layer[0] + Math.min(min[0], min[1]);
        int min1 = layer[1] + Math.min(min[0], Math.min(min[1], min[2]));
        int min2 = layer[2] + Math.min(min[1], min[2]);
        min[0] = min0;
        min[1] = min1;
        min[2] = min2;
    }

    public static void maxSum(int[] max,int[] layer){
        int max0 = layer[0] + Math.max(max[0], max[1]);
        int max1 = layer[1] + Math.max(max[0], Math.max(max[1], max[2]));
        int max2 = layer[2] + Math.max(max[1], max[2]);
        max[0] = max0;
        max[1] = max1;
        max[2] = max2;
    }

}
