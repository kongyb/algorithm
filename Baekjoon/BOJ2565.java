import java.util.Arrays;
import java.util.Scanner;

public class BOJ2565 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        Line[] lines = new Line[N];
        for (int i=0; i<N; i++) {
            lines[i] = new Line(sc.nextInt(), sc.nextInt());
        }
        Arrays.sort(lines, (a,b) -> a.i1 - b.i1);
        System.out.println(N - solution(lines, N));
    }

    static int solution(Line[] lines, int N) {
        int[] increase = new int[N];
        int len = 1;

        increase[0] = lines[0].i2;
        for (int i=1; i<N; i++) {
            int num = lines[i].i2;
            if (num > increase[len - 1]) {
                increase[len] = num;
                len++;
                continue;
            }
            increase[binary(increase, len, num)] = num;
        }
        return len;
    }

    static int binary(int[] arr, int end, int target) {
        int left = 0;
        int right = end;
        while (left < right) {
            int mid = (left + right) / 2;
            if (arr[mid] >= target) {
                right = mid;
            }
            else {
                left = mid + 1;
            }
        }
        return left;
    }

    static class Line {
        int i1;
        int i2;

        Line(int i1,int i2) {
            this.i1 = i1;
            this.i2 = i2;
        }
    }
}
