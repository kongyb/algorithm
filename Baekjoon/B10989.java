import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class B10989 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int len = Integer.parseInt(st.nextToken());
        int[] arr = new int[len];
        for (int i=0; i<len; i++){
            st = new StringTokenizer(br.readLine());
            arr[i] = Integer.parseInt(st.nextToken());
        }
        Arrays.sort(arr);
        StringBuilder sb = new StringBuilder();
        for (int i=0; i<len; i++){
            sb.append(arr[i]);
            if (i != len -1)
                sb.append("\n");
        }
        System.out.println(sb);
    }
}
