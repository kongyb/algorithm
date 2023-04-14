import java.util.Scanner;

public class BOJ16916 {
    // 백준 - 부분문자열
    // https://www.acmicpc.net/problem/16916
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str1 = sc.next();
        String str2 = sc.next();
        System.out.println(solution(str1, str2));
    }

    static int solution(String str1, String str2) {
        int[] pi = getPi(str2);
        int len = 0;
        for (int i=0; i<str1.length(); i++) {
            while (len > 0 && str1.charAt(i) != str2.charAt(len)) {
                len = pi[len - 1];
            }
            if (str1.charAt(i) == str2.charAt(len)) {
                len++;
            }
            if (len == str2.length()) {
                return 1;
            }
        }
        return 0;
    }

    static int[] getPi(String str) {
        int[] pi = new int[str.length()];
        int len = 0;
        for (int i=1; i<str.length(); i++) {
            while (len > 0 && str.charAt(len) != str.charAt(i)) {
                len = pi[len - 1];
            }
            if (str.charAt(len) == str.charAt(i)) {
                len++;
            }
            pi[i] = len;
        }
        return pi;
    }


}
