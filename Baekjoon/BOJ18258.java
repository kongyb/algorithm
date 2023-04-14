import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ18258 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        LinkedList<Integer> queue = new LinkedList();
        StringBuilder sb = new StringBuilder();
        for (int i=0; i<N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            String cmd = st.nextToken();
            if (cmd.equals("push")) {
                int num = Integer.parseInt(st.nextToken());
                queue.push(num);
            }
            if (cmd.equals("pop")) {
                if (queue.getLen() == 0) {
                    sb.append("-1\n");
                    continue;
                }
                sb.append(queue.pop());
                sb.append('\n');
            }
            if (cmd.equals("size")) {
                sb.append(queue.getLen());
                sb.append('\n');
            }
            if (cmd.equals("empty")) {
                sb.append(queue.getLen() == 0 ? 1 : 0);
                sb.append('\n');
            }
            if (cmd.equals("front")) {
                if (queue.getLen() == 0) {
                    sb.append("-1\n");
                    continue;
                }
                sb.append(queue.getHead());
                sb.append('\n');
            }
            if (cmd.equals("back")) {
                if (queue.getLen() == 0) {
                    sb.append("-1\n");
                    continue;
                }
                sb.append(queue.getTail());
                sb.append('\n');
            }
        }
        System.out.println(sb);
    }

    private static class LinkedList<T> {
        ListNode<T> head;
        ListNode<T> tail;
        int len;

        LinkedList() {
            this.head = null;
            this.tail = null;
        }

        void push(T val) {
            ListNode<T> node = new ListNode(val);
            if (this.len == 0) {
                this.head = node;
                this.tail = node;
                this.len++;
                return;
            }
            this.tail.next = node;
            this.tail = node;
            this.len++;
            return;
        }

        T pop() {
            if (this.len == 0) {
                return null;
            }
            ListNode<T> node = this.head;
            this.head = this.head.next;
            this.len--;
            if (this.head == null) {
                this.tail = null;
            }
            return node.val;
        }

        T getHead() {
            if (this.head == null) {
                return null;
            }
            return this.head.val;
        }

        T getTail() {
            if (this.tail == null) {
                return null;
            }
            return this.tail.val;
        }

        int getLen() {
            return this.len;
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
