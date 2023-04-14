import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Stack;

public class BOJ1874 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        int[] arr = new int[N];
        for (int i=0; i<N; i++) {
            arr[i] = Integer.parseInt(br.readLine());
        }
        Stack<Integer> stack = new Stack();
        int index = 0;
        StringBuilder sb = new StringBuilder();
        for (int i=1; i<=N; i++) {
            stack.push(i);
            sb.append("+\n");
            while (stack.size() > 0 && stack.peek() == arr[index]) {
                sb.append("-\n");
                stack.pop();
                index++;
            }
        }
        if (index < N) {
            System.out.println("NO");
        }
        else {
            System.out.println(sb);
        }
    }
}
