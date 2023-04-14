import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Stack;

public class BOJ4849 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String str = br.readLine();
        while (!str.equals(".")) {
            System.out.println(check(str) ? "yes" : "no");
            str = br.readLine();
        }
        br.close();
    }

    static boolean check(String str) {
        int len = str.length();
        Stack<Character> stack = new Stack();
        for (int i=0; i<len; i++) {
            char c = str.charAt(i);
            if (c == '(' || c == '[') {
                stack.push(c);
            }
            if (c == ')') {
                if (stack.size() != 0 && stack.peek() == '(') {
                    stack.pop();
                    continue;
                }
                return false;
            }
            if (c == ']') {
                if (stack.size() != 0 && stack.peek() == '[') {
                    stack.pop();
                    continue;
                }
                return false;
            }
        }
        return stack.size() == 0;
    }
}
