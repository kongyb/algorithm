import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ10828 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        LinkedList<Integer> stack = new LinkedList();
        StringBuilder sb = new StringBuilder();
        int cnt = Integer.parseInt(st.nextToken());
        for (int i=0; i<cnt; i++) {
            st = new StringTokenizer(br.readLine());
            String cmd = st.nextToken();
            if (cmd.equals("push")) {
                int num = Integer.parseInt(st.nextToken());
                stack.push(num);
            }
            if (cmd.equals("pop")) {
                Integer num = stack.pop();
                sb.append(num == null ? -1 : num);
                sb.append('\n');
            }
            if (cmd.equals("size")) {
                sb.append(stack.getLen());
                sb.append('\n');
            }
            if (cmd.equals("empty")) {
                sb.append(stack.getLen() == 0 ? 1 : 0);
                sb.append('\n');
            }
            if (cmd.equals("top")) {
                Integer top = stack.peek();
                sb.append(top == null ? -1 : top);
                sb.append('\n');
            }
        }
        System.out.print(sb);
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

        public int getLen() {
            return this.len;
        }

        public T peek() {
            if (this.len == 0) {
                return null;
            }
            return this.head.val;
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
