import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class BOJ5430 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int T = Integer.parseInt(br.readLine());
        for (int i=0; i<T; i++) {
            String cmd = br.readLine();
            int cnt = Integer.parseInt(br.readLine());
            int[] nums = parseArr(br.readLine(), cnt);
            System.out.print(solution(cmd, nums, cnt));
        }
    }

    private static String solution(String cmd, int[] nums, int cnt) {
        StringBuilder sb = new StringBuilder("[");
        int left = 0;
        int right = cnt-1;
        // true면 left부터 시작, false면 right부터 시작
        boolean leftIsFront = true;
        int total = cnt;
        for (int i=0; i<cmd.length(); i++) {
            char c = cmd.charAt(i);
            if (c == 'R') {
                leftIsFront = !leftIsFront;
            }
            if (c == 'D') {
                if (total == 0) {
                    return "error\n";
                }
                if (leftIsFront) {
                    left++;
                }
                if (!leftIsFront) {
                    right--;
                }
                total--;
            }
        }
        if (leftIsFront) {
            for (int i=left; i<=right; i++) {
                sb.append(nums[i]);
                sb.append(',');
            }
        }
        else {
            for (int i=right; i>=left; i--) {
                sb.append(nums[i]);
                sb.append(',');
            }
        }
        if (total == 0) {
            sb.append("]\n");
        }
        else {
            sb.replace(sb.length() - 1, sb.length(), "]\n");
        }
        return sb.toString();
    }

    private static int[] parseArr(String str, int cnt) {
        String[] words = str.split(",");
        int[] result = new int[cnt];
        for (int i=0; i<cnt; i++) {
            String word = words[i];
            if (i == 0) {
                word = word.substring(1);
            }
            if (i == cnt - 1) {
                word = word.substring(0,word.length() - 1);
            }
            result[i] = Integer.parseInt(word);
        }
        return result;
    }
}
