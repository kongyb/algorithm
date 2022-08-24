import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class B2293 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int cnt = Integer.parseInt(st.nextToken());
        int target = Integer.parseInt(st.nextToken());
        int[] coins = new int[cnt];
        for (int i=0; i<cnt; i++){
            st = new StringTokenizer(br.readLine());
            coins[i] = Integer.parseInt(st.nextToken());
        }
        int[] dp = new int[target+1];
        dp[0] = 1;
        for (int coin : coins){
            for (int i=coin; i<=target; i++)
                dp[i] += dp[i-coin];
        }
        System.out.println(dp[target]);
    }
}
