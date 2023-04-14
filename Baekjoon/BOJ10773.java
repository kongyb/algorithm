import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ10773 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        LinkedList<Integer> stack = new LinkedList();
        int cnt = Integer.parseInt(st.nextToken());
        int sum = 0;
        for (int i=0; i<cnt; i++) {
            st = new StringTokenizer(br.readLine());
            int num = Integer.parseInt(st.nextToken());
            if (num == 0) {
                int top = stack.pop();
                sum -= top;
                continue;
            }
            stack.push(num);
            sum += num;
        }
        System.out.println(sum);
    }

    private static class LinkedList<T> {
        ListNode<T> head;
        ListNode<T> tail;
        int len;

        LinkedList() {
            this.head = null;
            this.tail = null;
            this.len = 0;
        }

        public void push(T val) {
            ListNode<T> node = new ListNode(val);
            this.len++;
            if (this.len == 0) {
                this.head = node;
                this.tail = node;
                return;
            }
            node.next = this.head;
            this.head = node;
            return;
        }

        public T pop() {
            if (this.len == 0) {
                return null;
            }
            ListNode<T> node = this.head;
            this.head = this.head.next;
            if (this.head == null) {
                this.tail = null;
            }
            this.len--;
            return node.val;
        }
    }

    private static class ListNode<T> {
        T val;
        ListNode<T> next;

        ListNode(T val) {
            this.val = val;
            this.next = null;
        }
    }
}
