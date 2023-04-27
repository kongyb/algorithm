import java.util.Scanner;

public class BOJ24416 {

    static int cnt = 0;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        fib(N);
        System.out.printf("%d %d\n", cnt, (N > 2 ? N - 2 : 0));
    }

    static int fib(int n) {
        if (n == 1 || n == 2) {
            cnt++;
            return 1;
        }
        return fib(n-1) + fib(n-2);
    }
}
