import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ10866 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        DoubleLinkedList<Integer> deque = new DoubleLinkedList();
        StringTokenizer st;
        StringBuilder sb = new StringBuilder();
        for (int i=0; i<N; i++) {
            st = new StringTokenizer(br.readLine());
            String cmd = st.nextToken();
//          push_front X: 정수 X를 덱의 앞에 넣는다.
            if (cmd.equals("push_front")) {
                int num = Integer.parseInt(st.nextToken());
                deque.addHead(num);
            }
//          push_back X: 정수 X를 덱의 뒤에 넣는다.
            if (cmd.equals("push_back")) {
                int num = Integer.parseInt(st.nextToken());
                deque.addTail(num);
            }
//          pop_front: 덱의 가장 앞에 있는 수를 빼고, 그 수를 출력한다. 만약, 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
            if (cmd.equals("pop_front")) {
                Integer num = deque.popHead();
                sb.append(num == null ? -1 : num);
                sb.append('\n');
            }
//          pop_back: 덱의 가장 뒤에 있는 수를 빼고, 그 수를 출력한다. 만약, 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
            if (cmd.equals("pop_back")) {
                Integer num = deque.popTail();
                sb.append(num == null ? -1 : num);
                sb.append('\n');
            }
//          size: 덱에 들어있는 정수의 개수를 출력한다.
            if (cmd.equals("size")) {
                sb.append(deque.getLen());
                sb.append('\n');
            }
//          empty: 덱이 비어있으면 1을, 아니면 0을 출력한다.
            if (cmd.equals("empty")) {
                sb.append(deque.getLen() == 0 ? 1 : 0);
                sb.append('\n');
            }
//          front: 덱의 가장 앞에 있는 정수를 출력한다. 만약 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
            if (cmd.equals("front")) {
                Integer num = deque.getHead();
                sb.append(num == null ? -1 : num);
                sb.append('\n');
            }
//          back: 덱의 가장 뒤에 있는 정수를 출력한다. 만약 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
            if (cmd.equals("back")) {
                Integer num = deque.getTail();
                sb.append(num == null ? -1 : num);
                sb.append('\n');
            }
        }
        System.out.println(sb);
    }



    private static class DoubleLinkedList<T> {
        ListNode<T> head;
        ListNode<T> tail;
        int len;

        DoubleLinkedList() {
            this.head = null;
            this.tail = null;
            this.len = 0;
        }

        void addHead(T val) {
            ListNode<T> node = new ListNode(val);
            if (this.len == 0) {
                this.head = node;
                this.tail = node;
                this.len++;
                return;
            }
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
            this.len++;
        }

        void addTail(T val) {
            ListNode<T> node = new ListNode(val);
            if (this.len == 0) {
                this.head = node;
                this.tail = node;
                this.len++;
                return;
            }
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
            this.len++;
        }

        T getHead() {
            if (this.len == 0) {
                return null;
            }
            return this.head.val;
        }

        T getTail() {
            if (this.len == 0) {
                return null;
            }
            return this.tail.val;
        }

        T popHead() {
            if (this.len == 0) {
                return null;
            }
            ListNode<T> node = this.head;
            this.head = this.head.next;
            if (this.head == null) {
                this.tail = null;
            }
            else {
                this.head.prev = null;
            }
            this.len--;
            return node.val;
        }

        T popTail() {
            if (this.len == 0) {
                return null;
            }
            ListNode<T> node = this.tail;
            this.tail = this.tail.prev;
            if (this.tail == null) {
                this.head = null;
            }
            else {
                this.tail.next = null;
            }
            this.len--;
            return node.val;
        }

        int getLen() {
            return this.len;
        }

    }

    private static class ListNode<T> {
        T val;
        ListNode<T> prev;
        ListNode<T> next;

        ListNode(T val) {
            this.val = val;
            this.next = null;
            this.prev = null;
        }
    }

}
